import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef, private _renderer:Renderer2, private httpClientService:HttpClientService,public dialog: MatDialog,private alertifyService:AlertifyService) 
  { 
      const img=_renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png");
      img.setAttribute("style", "cursor: pointer;");
      img.width=25;
      img.height=25;
      _renderer.appendChild(element.nativeElement,img);
  }


  @Input() id: string;
  @Input() controller:string;
  @Output() callback:EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.openDialog(async()=>{
      const td: HTMLTableCellElement=this.element.nativeElement;
    this.httpClientService.delete({
      controller:this.controller

    },this.id).subscribe(data=>{
      $(td.parentElement).animate({
        opacity:0,
        left:"+50",
        height: "toogle"
      },700, ()=>{
        this.callback.emit();
        this.alertifyService.message("Delete process successful ",{
          dismissOthers:true,
          messageType:MessageType.Success,
          position:Position.TopCenter
        })
      });
    },(errorResponse:HttpErrorResponse)=>{
      
      this.alertifyService.message("Delete process failed ",{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopCenter
     });
     });
   })
    
  }


  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}


