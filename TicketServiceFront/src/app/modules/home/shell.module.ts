import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminModule } from "../admin/admin.module";
import { CoreModule } from "../../core/core.module";

import { ShellComponent } from "./shell/shell.component";

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, AdminModule, CoreModule]
})
export class ShellModule {}
