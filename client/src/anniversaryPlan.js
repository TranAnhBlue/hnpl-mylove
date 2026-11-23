export const emptyPlan = {
  sender: 'Anh', recipient: 'em', memory: '', gratitude: '', promise: '',
  wish: '', meetingDate: '', meetingTime: '', meetingPlace: '', invitation: '',
};

export function createLetter(plan = {}) {
  const p = { ...emptyPlan, ...plan };
  const sender = p.sender.trim() || 'Anh';
  const senderLower = sender.toLocaleLowerCase('vi');
  const recipient = p.recipient.trim() || 'em';
  const recipientName = recipient.charAt(0).toLocaleUpperCase('vi') + recipient.slice(1);

  return [
    `${recipientName} yêu à, vậy là chúng mình đã đi cùng nhau trọn vẹn một năm rồi. Một năm nghe qua tưởng chỉ là một khoảng thời gian ngắn, nhưng với ${senderLower}, đó là cả một hành trình có thật nhiều yêu thương, tiếng cười, những lần giận dỗi, những phút yếu lòng và cả những cái nắm tay khiến mọi chuyện dần trở nên ổn hơn.`,
    `Từ ngày có ${recipient}, những điều rất bình thường cũng trở nên đặc biệt. Một lời hỏi han, một tin nhắn chúc ngủ ngon, một bữa ăn bên nhau hay chỉ là khoảnh khắc được nhìn thấy ${recipient} cười cũng đủ làm ngày của ${senderLower} dịu lại. ${recipientName} đã bước vào cuộc sống của ${senderLower} theo một cách thật tự nhiên, rồi dần trở thành người mà ${senderLower} luôn muốn kể mọi chuyện đầu tiên.`,
    `Trong tất cả những khoảnh khắc của năm đầu tiên ấy, ${senderLower} vẫn nhớ nhất ${p.memory.trim()} Mỗi lần nghĩ về những ngày đó, ${senderLower} lại thấy biết ơn vì giữa rất nhiều người trên thế giới, chúng mình đã gặp được nhau, thương nhau và cùng tạo nên những ký ức chỉ thuộc về hai đứa.`,
    `Tình yêu của chúng mình không phải lúc nào cũng chỉ có những ngày thật đẹp. Đã có những lúc cả hai mệt mỏi, chưa kịp hiểu hết suy nghĩ của nhau hoặc vô tình làm nhau buồn. Nhưng điều khiến ${senderLower} trân trọng nhất là sau tất cả, chúng mình vẫn lựa chọn ngồi lại, lắng nghe, sửa đổi và nắm tay nhau bước tiếp.`,
    `Cảm ơn ${recipient} vì ${p.gratitude.trim()} Với ${senderLower}, sự hiện diện và lựa chọn ở lại của ${recipient} chính là một trong những món quà quý giá nhất mà năm vừa qua đã mang đến.`,
    `${sender.charAt(0).toLocaleUpperCase('vi') + sender.slice(1)} biết mình vẫn còn những điều chưa hoàn hảo, đôi khi còn vụng về trong cách thể hiện tình cảm và chưa phải lúc nào cũng nói được hết những điều ở trong lòng. Nhưng có một điều ${senderLower} luôn chắc chắn: tình yêu ${senderLower} dành cho ${recipient} là thật, và mong muốn được cùng ${recipient} xây dựng một tương lai hạnh phúc cũng là thật.`,
    `Bước sang năm thứ hai, ${senderLower} muốn ${p.promise.trim()} ${sender.charAt(0).toLocaleUpperCase('vi') + sender.slice(1)} mong chúng mình sẽ vẫn luôn thành thật với nhau, kiên nhẫn thêm một chút khi có bất đồng và dịu dàng với nhau nhiều hơn sau những ngày dài mệt mỏi.`,
    `${sender.charAt(0).toLocaleUpperCase('vi') + sender.slice(1)} không mong câu chuyện của chúng mình phải lúc nào cũng hoàn hảo. ${sender.charAt(0).toLocaleUpperCase('vi') + sender.slice(1)} chỉ mong trong mỗi chặng đường sắp tới, dù vui hay buồn, người chúng mình muốn quay về và sẻ chia vẫn là nhau. Mong hai đứa sẽ còn cùng nhau đón thật nhiều ngày kỷ niệm, thực hiện những chuyến đi còn dang dở và biến những điều ước hôm nay thành ký ức đẹp của mai sau.`,
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
