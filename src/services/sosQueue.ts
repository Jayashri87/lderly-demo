import { FirestoreService } from "./firebase/firestore";
import { AnalyticsService } from "./analytics";

export const SOSQueueService = {
  async triggerSOS(userId: string, location: any) {
    const sosData = {
      userId,
      location,
      status: "pending",
      retryCount: 0,
      timestamp: new Date().toISOString(),
    };

    try {
      const sosId = await FirestoreService.create("sos_queue", sosData);
      AnalyticsService.trackEmergencyTriggered(userId, location);
      return sosId;
    } catch (error) {
      console.error("Initial SOS trigger failed, saving to local queue", error);
      this.saveToLocalQueue(sosData);
      return null;
    }
  },

  saveToLocalQueue(data: any) {
    const queue = JSON.parse(localStorage.getItem("sos_retry_queue") || "[]");
    queue.push(data);
    localStorage.setItem("sos_retry_queue", JSON.stringify(queue));
    this.startRetryProcess();
  },

  async startRetryProcess() {
    const queue = JSON.parse(localStorage.getItem("sos_retry_queue") || "[]");
    if (queue.length === 0) return;

    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      try {
        await FirestoreService.create("sos_queue", item);
        queue.splice(i, 1);
        i--;
      } catch (error) {
        console.error("Retry failed for SOS item", error);
        item.retryCount++;
      }
    }

    localStorage.setItem("sos_retry_queue", JSON.stringify(queue));
    if (queue.length > 0) {
      setTimeout(() => this.startRetryProcess(), 5000); // Retry every 5s
    }
  }
};
