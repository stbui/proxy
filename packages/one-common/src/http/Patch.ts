import { PATH_METADATA, METHOD_METADATA } from '../constants';
import { RequestMapping } from './request-mapping';

export const Patch = (path?: string | string[]) =>
    RequestMapping({ [PATH_METADATA]: path, [METHOD_METADATA]: 'PATCH' });
