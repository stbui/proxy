import 'reflect-metadata';
import express from 'express';
import expressStatic from './static';
const app = express();
const port = Number(process.env.PORT) || 8080;
export class Runner {
    static run(controllers) {
        app.get('/health', (req, res) => res.status(200).send('OK'));
        controllers.forEach(controller => {
            const instance = new controller();
            const prefix = Reflect.getMetadata('prefix', controller);
            const routes = Reflect.getMetadata('routes', controller);
            routes.forEach(route => {
                app[route.requestMethod](prefix + route.path, (req, res) => {
                    const result = instance[route.methodName](req, res);
                    if (result) {
                        res.status(200).send(result);
                    }
                    else {
                        res.status(200).send();
                    }
                });
            });
        });
        expressStatic(app);
        this.bootstrap();
    }
    static bootstrap() {
        app.listen(port, () => {
            console.log(`Started za-proxy on port ${port}`);
        });
    }
}
//# sourceMappingURL=run.js.map