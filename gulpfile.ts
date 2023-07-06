import { series } from 'gulp';
import { buildModules } from './modules';

export default series(buildModules);
