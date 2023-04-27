var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
let Feedback = class Feedback {
    constructor() {
        this.enabled = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    PrimaryKey(),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Feedback.prototype, "title", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Feedback.prototype, "content", void 0);
__decorate([
    Property(),
    __metadata("design:type", Object)
], Feedback.prototype, "enabled", void 0);
__decorate([
    Property({ defaultRaw: "now()" }),
    __metadata("design:type", Object)
], Feedback.prototype, "createdAt", void 0);
__decorate([
    Property({ onUpdate: () => new Date(), defaultRaw: "now()" }),
    __metadata("design:type", Object)
], Feedback.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne(),
    __metadata("design:type", Object)
], Feedback.prototype, "author", void 0);
__decorate([
    ManyToOne({ default: 1 }),
    __metadata("design:type", Object)
], Feedback.prototype, "status", void 0);
__decorate([
    ManyToOne(),
    __metadata("design:type", Object)
], Feedback.prototype, "category", void 0);
Feedback = __decorate([
    Entity()
], Feedback);
export { Feedback };
