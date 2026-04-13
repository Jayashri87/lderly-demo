export const AnalyticsService = {
  logEvent(eventName: string, params?: any) {
    console.log(`[Analytics] ${eventName}`, params);
    // In production, integrate with Firebase Analytics or Mixpanel
  },

  trackSubscriptionUpgrade(planId: string, userId: string) {
    this.logEvent("subscription_upgrade", { planId, userId });
  },

  trackEmergencyTriggered(userId: string, location: any) {
    this.logEvent("emergency_triggered", { userId, location });
  },

  trackVisitCompleted(visitId: string, caretakerId: string) {
    this.logEvent("visit_completed", { visitId, caretakerId });
  },

  trackMoodDecline(parentId: string, score: number) {
    this.logEvent("mood_decline", { parentId, score });
  }
};
