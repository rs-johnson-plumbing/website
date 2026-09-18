import copy from '../../content/robo-ryan-followup.json';

export function followUpAvailable() {
  return process.env.ROBO_RYAN_FOLLOWUP_ENABLED === 'true'
    && !!process.env.RESEND_API_KEY && !!process.env.ROBO_RYAN_FOLLOWUP_FROM;
}

export function offerFollowUp(reply = copy.unknown) {
  const emailAvailable = followUpAvailable();
  return {
    reply: `${reply}\n\n${emailAvailable ? copy.offer : copy.unavailable}`,
    followUp: true,
    emailAvailable,
  };
}
