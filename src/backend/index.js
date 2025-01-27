import {init} from './appFetch';
import * as userService from './userService';
import * as catalogService from './catalogService'
import * as sellerService from './sellerService'
import * as shoppingService from './shoppingService'
import * as paymentService from './paymentService.js'

export {default as NetworkError} from "./NetworkError";

// eslint-disable-next-line
export default {init, userService, catalogService, sellerService, shoppingService, paymentService};
