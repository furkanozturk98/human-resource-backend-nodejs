import { configure, getLogger } from 'log4js';

configure({
    appenders : {
        console  : { type : 'stdout', layout : { type : 'colored' } },
        dateFile : { type : "file", filename : "logs/app.log" }
    },
    categories : {
        default : {
            appenders : ['console', 'dateFile'],
            level     : 'debug'
        }
    }
});

export const logger = getLogger();