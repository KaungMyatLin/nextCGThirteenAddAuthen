const { PHASE_DEVELOPMENT_SERVER } = require( 'next/constants' )

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER ) {
    return {
      env: {
        mongodb_un: 'anyadmin'
        , mongodb_pw: 'tw22d56f'
        , mongodb_cluster: 'cluster0'
        , mongodb_db: 'nextjscgthirteenaddauthen'
      }
    }
  }
}