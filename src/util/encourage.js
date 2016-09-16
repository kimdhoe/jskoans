// number -> string
// Given the number of attemps, produces an appropriate encouragement.
const encourage = n =>
  n < 2 ? ''                      :
  n < 5 ? '희망을 잃지 마십시오.' :
          '좌절하고 있군요. 도움 청하기를 두려워 마십시오.'

export default encourage
