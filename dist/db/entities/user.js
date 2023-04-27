var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
let User = class User {
    constructor() {
        this.activated = false;
        this.createdAt = new Date();
    }
};
__decorate([
    PrimaryKey(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], User.prototype, "img", void 0);
__decorate([
    Property(),
    Unique(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Property(),
    Unique(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Property(),
    Unique(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Property(),
    __metadata("design:type", Object)
], User.prototype, "activated", void 0);
__decorate([
    Property({ defaultRaw: "now()" }),
    __metadata("design:type", Object)
], User.prototype, "createdAt", void 0);
User = __decorate([
    Entity()
], User);
export { User };
