module.exports = function toReadable (number) {
  const arr = (number.toString().split(''));
  let str = '';
  let digThous = [];
  let dozThous = [];
  let hundThous = [];
  let digMill = [];
  let dozMill = [];
  let hundMill = [];
  let digBill = [];
  let dozBill = [];
  let hundBill = [];
  let revArr = arr.concat([]);
  revArr = revArr.reverse();
  for (let i = 0; i < arr.length; i++) {
    switch (i) {
      case 3 : digThous.push(revArr[i]); break;
      case 4 : dozThous.push(revArr[i], revArr[i - 1]); break;
      case 5 : hundThous.push(revArr[i], revArr[i - 1], revArr[i - 2]); break;
      case 6 : digMill.push(revArr[i]); break;
      case 7 : dozMill.push(revArr[i], revArr[i - 1]); break;
      case 8 : hundMill.push(revArr[i], revArr[i - 1], revArr[i - 2]); break;
      case 9 : digBill.push(revArr[i]); break;
      case 10 : dozBill.push(revArr[i], revArr[i - 1]); break;
      case 11 : hundBill.push(revArr[i], revArr[i - 1], revArr[i - 2]); break;
      default : break;
    }
  }
  
  const digits = ['', ' one', ' two', ' three', ' four', ' five', ' six', ' seven', ' eight', ' nine'];
  const xTeens = ['ten', 'eleven', 'twelve','thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const dozen = ['', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  const sDig = (arr) => {
    const length = arr.length;
    if (number === 0) return 'zero';
    else if (number !== 0 && +arr[length - 2] !== 1) return digits[arr[length - 1]];
    else return '';
  };
  
  const sTeen = (arr) => {
    const length = arr.length;
    if (length > 1 && +arr[length - 2] === 1) return xTeens[arr[length - 1]];
    else return '';
  };
  
  const sDoz = (arr) => {
    const length = arr.length;
    if (length > 1 && +arr[length - 2] > 1) return dozen[arr[length - 2] - 1];
    else return '';
  }
  
  const sHund = (arr) => {
    const length = arr.length;
    if (length > 2 && +arr[length - 3] > 0) return digits[arr[length - 3]] + ' hundred ';
    else return '';
  }
  
  let thousand = '';
  if (arr.length > 3) {
    if (!sDoz(dozThous) && !sTeen(dozThous)) thousand = sHund(hundThous) + sDig(digThous);
    else if (sDoz(dozThous)) thousand = sHund(hundThous) + sDoz(dozThous) + sDig(digThous);
    else thousand = sHund(hundThous) + sTeen(dozThous);
  } else thousand = '';
  if (thousand) thousand = thousand + ' thousand ';

	let million = '';
  if (arr.length > 6) {
    if (!sDoz(dozMill) && !sTeen(dozMill)) million = sHund(hundMill) + sDig(digMill);
    else if (sDoz(dozMill)) million = sHund(hundMill) + sDoz(dozMill) + sDig(digMill);
    else million = sHund(hundMill) + sTeen(dozMill);
  } else million = '';
  if (million) million = million + ' million ';
  
  let billion = '';
  if (arr.length > 9) {
    if (!sDoz(dozBill) && !sTeen(dozBill)) billion = sHund(hundBill) + sDig(digBill);
    else if (sDoz(dozBill)) billion = sHund(hundBill) + sDoz(dozBill) + sDig(digBill);
    else billion = sHund(hundBill) + sTeen(dozBill);
  } else billion = '';
  if (billion) billion = billion + ' billion ';
  
  str = billion + million + thousand + sHund(arr) + sDoz(arr) + sTeen(arr) + sDig(arr);
  str = str.replace(/\s+/g,' ').trim();
  return str;
}