const KOANS =
  [ { category: 'assert'
    , koans:    [ { method: 'strictEqual'
                  , actualString: 'true'
                  , actualValue: true
                  , message: '참은 참이요, 거짓은 거짓이다.'
                  }
                , { method: 'strictEqual'
                  , actualString: 'false'
                  , actualValue: false
                  , message: '참은 참이요, 거짓은 거짓이다.'
                  }
                ]
    }
  , { category: 'string'
    , koans:    [ { method: 'equal'
                  , actualString: "'abcd' + 'efg'"
                  , actualValue: 'abcdefg'
                  , message: 'string'
                  }
                ]

    }
  , { category: 'array'
    , koans:    [ { method: 'deepEqual'
                  , actualString: '1 + 1'
                  , actualValue: 2
                  , message: 'hahaha'
                  }
                ]
    }
  ]

export default KOANS
