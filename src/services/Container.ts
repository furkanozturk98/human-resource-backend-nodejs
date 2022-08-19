import {
    createContainer,
    asClass,
    asValue,
    Lifetime
} from 'awilix';
import i18n from '../config/i18n.config';
import { LocaleService } from './LocaleService';

const container = createContainer();

container
    .register({
        localeService : asClass(LocaleService, { lifetime : Lifetime.SINGLETON })
    })
    .register({
        i18nProvider : asValue(i18n)
    });

export default container;