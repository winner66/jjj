// _______契税--------买房名下
// 1.买方家庭为首套房、且建筑面积小于90平方的，为“评税总价×1 %”   2.买方家庭为首套房、且建筑面积大于等于90平方的，为“评税总价×1.5 %”   3. 买方家庭为二套房、且建筑面积小于90平方的，为“评税总价×1 %”    4.买方家庭为二套房、且建筑面积大于等于90平方的，为“评税总价×2 %”   5.买方家庭为三套及以上的，不论建筑面积大小，一律为“评税总价×4 %”
// 税率1  area<90   count <1
const  pRate1 = 0.01;
// 税率2   >=90   count < 1
const  pRate2 = 0.015;
// 税率1   <90  count >=1
const  pRate3 = 0.010;
// 税率1  >90  count >=1
const  pRate4 = 0.020;
// 税率1  count >=3
const  pRate5 = 0.040;



const  pArea = 90;
// -----------个人所得税---卖方名下------
// 评税总价×1 % 不分建筑面积。但若卖方此房办理产权满五年（满五）、且是其家庭唯一住房（唯一），则免交个人所得税。
const  gRate = 0.010;
const gYear=5;
//1： 唯一
const gHouseCount="否";
// -----------增值税---卖方名下------
// 评税总价×5.3 % 在办理产权不满两年时征收。
const  zRate = 0.053;
// 0:一年 1： 两年
const  zyear = 1;
// -----------土地出让金--卖方名下------
//前提条件是：土地性质为“划拨”
// 计算公式：1.没有“房改”：地价×土地分摊面积   2.是“房改”，则为“评税总价×1 %”  3.若所售房产为继承所得（继承分为“夫妻之间继承”和“非夫妻继承”），若为非夫妻继承，就算是房子是“房改”，也要按第1种方案征收土地出让金。
const  tRate = 0.010;
const name2 = "划拨";
const name1="出让";
const name3="划拨（房改）";

// -----------继承税   ----卖方--
const jRate=0.2;
// -----------赠予税    ---卖方--
const  pRate=0.2;
// -----------中介费     ---三种方案-- 传过来的--
const  buyRate = 0;
const  sellRate = 0;
// -----------贷款服务费---传过来--
const  loanServerRate = 0;

// -----------拆迁抵扣-----
// 拆迁补偿money:(传过来的数据))
const  cQmoney = 10000;
// 印花税和工本费就不计算了。

// 契税
function cptDeedTax(area,price,housecount) {
    if(housecount>=3){
      return area * price * pRate5     
    }else if(housecount>1){
      if (area < pArea) {
        return area * price * pRate3
      } else {
        return area * price * pRate4
        }
      
    }else{
      if (area < pArea) {
        return area * price* pRate1
      } else {
        return area * price * pRate2
      }
    }
}
// 个人所得税
function cptGMoney( area,price,  yearIndex, houseOnly) {
  if (yearIndex <  gYear && houseOnly == gHouseCount){
      return 0;
  }else{
    return area * price *zRate;
  }
}
// 增值税
function cptAddMoney(area, price, housecount) {
  if (housecount >= zyear ) {
    return 0;
  } else {
    return area * price * zRate;
  }
}
// 土地出让金
function cptLandMoney(area, price, lands) {
  if (name1==lands){
    // 出入
    return 0;

  } else if (name2 == lands){
    // 划拨无房改
    return area * price
    
  } else if (name3 == lands){
 // 划拨房改
    return area * price * tRate
  }else{
// 其他
    console.log(" 土地出让cptLandMoney function error ")
  }
}
// 继承
    function cptJTax(flag,area, price) {
      if (flag == "否") return 0;
      return area* price*jRate;
    }
    // 赠予税
function cptPTax(flag,area, price) {
  if (flag=="否") return 0;
  return area*price;
}
// 中介费-
function cptMidTax(area, price,rate) {
  return area * price* rate;
}
// 贷款服务费
function cptLoanServerTax(money,rate) {
  return money* rate;
 }
// 拆迁抵扣
function cptCQTax(area,price,housecount) {
  if ((area * price)<cQmoney){
        return 0;
    }else{
      var diff= (area* price)- cQmoney;
    return diff * cQTax(area,housecount)
    }
 }
//  找出超出部分（的评税率）
function cQTax(area, housecount){
  if (housecount >= 3) {
    return  pRate5
  } else if (housecount > 1) {
    if (area < pArea) {
      return pRate3
    } else {
      return  pRate4
    }

  } else {
    // 首套
    if (area < pArea) {
      return  pRate1
    } else {
      return  pRate2
    }
  }
}

module.exports = {
  cptDeedTax, cptAddMoney, cptGMoney, cptLandMoney, cptJTax, cptPTax, cptMidTax, cptCQTax, cptLoanServerTax
}