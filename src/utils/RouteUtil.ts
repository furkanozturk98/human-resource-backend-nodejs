// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function unless(middleware, ...paths: string[]): (req, res, next) => void
{
    return function(req, res, next) {
        const pathCheck = paths.some(path => path === req.path);
        pathCheck ? next() : middleware(req, res, next);
    };
}