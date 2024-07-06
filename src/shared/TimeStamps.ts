import { Prop } from "@nestjs/mongoose";

export class TimeStamps {
	@Prop({ default: Date.now() })
	createdAt: Date;

	@Prop({ default: Date.now() })
	updatedAt: Date;
}