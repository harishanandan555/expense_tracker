export const AppConstants = {

    /*
    STAGING_BASE_URL: 'https://bullbox-api.herokuapp.com/v1',
    STAGING_BASE_URL : "https://bullbox-api.onrender.com/v1",
    STAGING_BASE_URL: 'https://bullbox-tunnel.loca.lt/v1',
    */
  
    /* API_BASE_URL: 'https://apistaging.bullbox.in/v1',*/
  
    
    API_BASE_URL : "https://api.bullbox.in/v1",
    // API_BASE_URL: 'http://localhost:1337/v1'
    
  }
  
  export const API_END_POINTS = {
  
      LOGIN : "user/login",
      LOGOUT : "user/logout",
      SEND_OTP: 'user/sendotp',
      SEND_2FACTOR_OTP: 'user/2factor/sendotp',
      VALIDATE_2FACTOR_NOMINEE: 'validation/nominee/2factor',
  
      VALIDATE_OTP: 'user/validateotp',
      ACCOUNT_ACTIVATION:'/user/verifyaccount',
      VERIFY_EMAIL:'/user/verifyemail',
      VERIFY_MPIN:'/user/verifympin',
      RESET_PASSWORD:'/user/resetpassword',
      VALIDATE_SESSION:'/user/validatesession',
  
      VALIDATE_IDPROOF:'/validation/verifyidproof',
      VALIDATE_PAN:'/validation/verifyid',
      VALIDATE_AADHAAR:'/validation/verifyid',
      VALIDATE_BANK_ACCOUNT:'/validation/bankaccount',
      VALIDATE_PERSONAL:'/validation/personal',
      STATISTICS:'master/scheme/statistics',
      VERIFY_STAGE: '/validation/verifystage',
      UPDATE_PERSONAL:'/validation/personal/update',
  
      ELOG_PHOTO_UPLOAD:'master/client/upload/photograph',
      FATCA_UPLOAD:'master/client/upload/fatca',
  
      CLIENT_CODE_CREATE: 'master/client/create',
      LIST_CLIENT: '/master/clientlist',
  
      ADD_BANK_ACCOUNT:'/validation/bankaccount/add',
      SAVE_BANK_ACCOUNT:'/validation/bankaccount/save',
  
      FETCH_STAGE :'/master/stageinfo',
      LIST_SCHEME: '/master/schemelist',
      LIST_STP_SCHEMES: '/master/stplist',
      LIST_BANKACCOUNT: '/master/bankaccountlist',
      LIST_NOMINEE: '/master/nomineelist',
      LIST_WATCH_SCHEMES: '/master/schemewatchlist',
      LIST_SCHEME_ADVISE: '/master/schemeadviselist',
      FETCH_SCHEME_ADVISE_INFO: '/master/schemeadvise',
      LIST_SCHEME_ADVISE_SUBSCRIBERS: '/master/schemeadvise/subscribers',
      
      ADD_WATCHLIST: '/master/watchlist/add',
      MODIFY_WATCHLIST: '/master/watchlist/modify',
  
      REPORT_GENERIC : '/report',
      REPORT_ALLOTMENT :'/report/allotment',
  
      CREATE_PAYMENT_ORDER: 'payment/schemeadvise/order',
      EXPERT_ADVISE_SUBMIT: 'payment/expertadvise/submit',
      
      LIST_ORDERS: '/order/list',
      CREATE_SINGLE_ORDER: '/order/create',
      ADDITIONAL_SINGLE_ORDER: '/order/additional',
      MODIFY_SINGLE_ORDER: '/order/modify',
      CANCEL_SINGLE_ORDER: '/order/cancel',
      REDEEM_2FACTOR_ORDER: '/order/redeem/2factor',
      LOAD_PORTFOLIO: '/order/portfolio',
  
      GET_ORDER_STATEMENT: '/master/order/statement',
      DOWNLOAD_ORDER_STATEMENT: '/master/order/statement/download',
      GENERAL_DOWNLOAD: '/master/general/download',
      DOWNLOAD_FILE: '/validation/file/download',
  
      CREATE_SIP_ORDER: '/sip/create',
      CANCEL_SIP_ORDER: '/sip/cancel',
      PAUSE_SIP_ORDER: '/sip/pause',
  
      CREATE_XSIP_ORDER: '/xsip/create',
      CANCEL_XSIP_ORDER: '/xsip/cancel',
      PAUSE_XSIP_ORDER: '/xsip/pause',
      
      CREATE_SWP_ORDER: '/swp/create',
      CANCEL_SWP_ORDER: '/swp/cancel',
  
      CREATE_STP_ORDER: '/stp/register',
      CANCEL_STP_ORDER: '/stp/cancel',
  
      LOAD_NACH_MANDATE: '/master/nachmandate',
      REGISTER_NACH_MANDATE: '/xsip/mandate/register',
      UPLOAD_NACH_MANDATE: '/validation/nachmandate/upload',
      STATUS_NACH_MANDATE: '/validation/nachmandate/status',
      CANCEL_NACH_MANDATE: '/validation/nachmandate/cancel',
      ENACH_MANDATE: '/xsip/mandate/enach',
      
      DOWNLOAD_NACH_MANDATE: '/validation/nachmandate/download',
  
      DOWNLOAD_NOMINEE: '/validation/nominee/download',
      UPLOAD_NOMINEE: '/validation/nominee/upload',
      
      INITIATE_PAYMENT:'/master/bse/paymentgateway',
      PAYMENT_RESPONSE:'/master/bse/mfapi',
      SIP_STATUS:'/master/bse/mfapi/sip',
  
      INITIATE_2FA_BSESTARMF: '/user/2factor/bsestarmf',
  
      DAILY_UPLOAD_SCHEME_MASTER:'/daily/data/upload',
      DAILY_UPLOAD_LUMPSUM_FUNDCONFIRM:'/daily/lumpsum/fundconfirm',
      DAILY_UPLOAD_XSIP_FUNDCONFIRM:'/daily/xsip/fundconfirm',
      DAILY_UPLOAD_NAV_UPDATE:'/daily/nav/update',
      DAILY_UPLOAD_SCRAP_HOLDINGS: 'daily/scrap/holdings'
  
  }