export const emptyPlan = {
  sender: 'Anh', recipient: 'em', memory: '', gratitude: '', promise: '',
  wish: '', meetingDate: '', meetingTime: '', meetingPlace: '', invitation: '',
};

export function createLetter(plan = {}) {
  const p = { ...emptyPlan, ...plan };
  return [
    `${p.sender} vẫn nhớ ${p.memory.trim()}`,
    `Cảm ơn ${p.recipient} vì ${p.gratitude.trim()}`,
    `Bước sang năm thứ hai, ${p.sender.toLocaleLowerCase('vi')} muốn ${p.promise.trim()}`,
  ];
}

export function hasPersonalLetter(plan = {}) {
  return ['memory', 'gratitude', 'promise'].every(key => typeof plan[key] === 'string' && plan[key].trim());
}

export function meetingLabel(plan = {}) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(plan.meetingDate || '')) return '';
  const [year, month, day] = plan.meetingDate.split('-');
  return `${plan.meetingTime ? `${plan.meetingTime} · ` : ''}${day}/${month}/${year}`;
}
