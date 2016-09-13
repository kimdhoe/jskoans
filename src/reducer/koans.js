// type Koan = { category:     string
//             , index:        number
//             , method:       string
//             , actualString: string
//             , actualValue:  any
//             , message:      string
//             }

const reducer = () => {
  return {
    koans: {
      assert: [
        {
          method: 'equal',
          actualString: '1 + 1',
          actualValue: 2,
          message: 'hahaha'
        }
      ],
      string: [
        {
          method: 'notEqual',
          actualString: '1 + 1',
          actualValue: 2,
          message: 'hahaha'
        }
      ],
      array: [
        {
          method: 'deepEqual',
          actualString: '1 + 1',
          actualValue: 2,
          message: 'hahaha'
        }
      ]
    }
  }
}

export default reducer

