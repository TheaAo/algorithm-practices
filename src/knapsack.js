/**
 * 0-1 背包问题
 * 给定一个固定大小、能够携重量 W 的背包，以及一组有价值和重量的物品.
 * 找出一个最佳解决方案，使得装入背包的物品总重量不超过 W，且总价值最大。
 * @param {number} capacity 总重量
 * @param {Object[]} objects 物品
 * @param {number} objects[].value 物品价值
 * @param {number} objects[].weight 物品重量
 * @return {Object[]}
 */
function knapsack(capacity, objects) {
  if(capacity < 0) {
    return -1;
  }

  if(capacity === 0) {
    return [];
  }
  const cache = Array(objects.length).fill([]);

  for(let i = objects.length - 1; i >= 0; i--) {
    for(let c = 0; c <= capacity; c++) {
      if(c === 0) {
        cache[i][c] = [];
      } else {
        const lastCapacity = c - objects[i].weight;
        if(i === objects.length - 1) {
          if(lastCapacity >= 0) {
            cache[i][c] = [objects[i]]
          } else {
            cache[i][c] = []
          }
        } else {
          if(lastCapacity >= 0) {
            const withinCurrentObject = [objects[i], ...cache[i + 1][lastCapacity]]
            if(calcTotalValue(withinCurrentObject) > calcTotalValue(cache[i + 1][c])) {
              cache[i][c] = withinCurrentObject
            } else {
              cache[i][c] = cache[i + 1][c]
            }
          } else{
            cache[i][c] = cache[i + 1][c]
          }
        }
      }
      
    }
  }
  console.log(11111);
  return cache[0][capacity];
}

function calcTotalValue(objects) {
  return objects.reduce((prev, curr) => curr.value + prev, 0);
}

const objects = [{value: 3, weight: 2}, {value: 4, weight: 3}, {value: 5, weight: 4}];
const capacity = 4;
console.log(knapsack(capacity, objects));



// rules: "110078|110079|110080|110081|110082|110011|110012|110013|110015|110016|110017:CUSTOMER_MARKET_NAME^CUSTOMER_MARKET_DATE?required=true&visible=true,110078|110079|110080|110081|110082|110024|110025|110026|110027|110028:CUSTOMER_BB_CODE?required=true&visible=true,110115|110114|110112|110111|110106|110107|110108|110113|110007|110008|110020|110021|110022:CUSTOMER_THEME_ACTIVITY?required=true&visible=true,110112|110111|110106|110107|110007|110008|110011|110012|110013|110015|110016|110017|110020|110021|110022|110035|110037|110038|110039|110040|110042|110042|110043:CUSTOMER_DELIVERY_CHANNEL?required=true&visible=true,110103|110095|110096|110104|110031|110032|110033|110035|110037|110038|110039|110040|110041|110042|110043:CUSTOMER_PRODUCT_INNER_CODE?required=true&visible=true,110045|110046|110047|110048|110049|110050|110051|110052|110053|110054|110055|110056|110057|110058|110059|110060|110061|110062|110063|110064|110065|110066|110067|110068|110069|110070|110071|110072|110073|110074|110075:CUSTOMER_PR_INCIDENT_DATE?required=false&visible=true,110077:ORIGIN_AI_BASE_INFO?required=true&visible=true,110115:CUSTOMER_VIDEO_COVER1^CUSTOMER_VIDEO_COVER2?required=false&visible=true,110090|110091|110092|110093:CUSTOMER_THEME_TAG?required=false&visible=true,110103|110095|110096|110104|110031|110032|110033|110035|110037|110038|110039|110040|110041|110042|110043:CUSTOMER_PRODUCT_BAR_CODE?required=true&visible=true,110115|110114|110108|110105|110113:CUSTOMER_DELIVERY_CHANNEL^CUSTOMER_PRODUCT_INNER_CODE^CUSTOMER_PRODUCT_BAR_CODE^CORE_EXPIRE_TIME?required=true&visible=true,110114|110108|110113:CUSTOMER_VIDEO_COVER1^CUSTOMER_VIDEO_COVER2?required=true&visible=true"
