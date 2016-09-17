import React    from 'react'
import { Link } from 'react-router'

import Koan     from './Koan'
import Toc      from './Toc'

const meditation =
  { description: [ '준비됐으면 true를 입력하세요.' ]
  , code:        [ { hasInputField: true
                   , text:          'const isReady = _____'
                   }
                 , { hasInputField: false
                   , text:          ''
                   }
                 , { hasInputField: false
                   , text:          'assert.isTrue( isReady )'
                   }
                 ]
}
const next = { category: 'assert', id: 0 }

const Greetings = () =>
  <div className="Greetings">
    <p className="Greetings-welcome">JS Koans는 JavaScript의 기본 개념들을 배우는
    여정의 안내자입니다. 이 여정은 JavaScript의 개념들을 확인하는 작은 대화형 문제들로 이루어져
     있으며, 완성되지 않은 단위 테스트 형식의 코드를 제시합니다. 여러분의 역할은 테스트가 통과할
    수 있도록 이 코드를 완성하는 것입니다.</p>

    <Koan
      meditation={meditation}
      next={next}
    />

    {/* <Link className="Greetings-startButton" to='/assert/0'>시작</Link> */}

    <Toc />
  </div>

export default Greetings
