import App from './app';

const PORT = process.env.PORT || '5000';

const app = new App(
    parseInt(PORT,10)
);

app.listen();
app.database.connect();

import { generateToken } from './utils/JwtUtil';

// Only generate a token for lower level environments
if (process.env.APP !== 'production') {
     generateToken();
}

// console.log(localeService.getLocales());
// console.log(localeService.getCurrentLocale());
// // console.log(localeService.translate('Hello'));
// console.log(localeService.translate('employee.messages.body_fields'));
// // console.log(localeService.translatePlurals('You have %s message', 3));
