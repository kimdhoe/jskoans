const KOANS =
  [ { category: 'assert'
    , koans:    [ { method: 'equal'
                  , actualString: '1 + 1'
                  , actualValue: 2
                  , message: 'hahaha'
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
