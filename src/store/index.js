import { readonly } from 'vue'

import userModule from './users'
import globalModule from './global'

export default readonly({
  User: userModule,
  Global: globalModule
})
