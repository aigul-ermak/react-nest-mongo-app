import {Module} from '@nestjs/common';
import {SessionService} from './session.service';
import {SessionController} from './session.controller';
import {SessionQueryRepo} from "./repositories/session.query.repo";
import {SessionRepo} from "./repositories/session.repo";
import {MongooseModule} from "@nestjs/mongoose";
import {Session, SessionEntity} from "./entities/session.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Session.name, schema: SessionEntity}])
    ],
    controllers: [SessionController],
    providers: [SessionService, SessionRepo, SessionQueryRepo],
    exports: [SessionRepo],
})
export class SessionModule {
}
