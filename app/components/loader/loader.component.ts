import {Input, OnDestroy, Component} from 'angular2/core';
import {NgClass} from 'angular2/common'

export class BaseSpinner implements OnDestroy {
  private visible: boolean = true;
  private timeout: number;

  @Input()
  public delay: number = 0;
  @Input()
  public white: boolean;
  @Input()
  public set isRunning(value: boolean) {
    if (!value) {
      this.cancel();
      this.visible = false;
    }

    if (this.timeout) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.visible = true;
      this.cancel();
    }, this.delay);
  }

  private cancel(): void {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  ngOnDestroy(): any {
    this.cancel();
  }
}


@Component({
  directives: [NgClass],
  selector: 'loader',
  styles: [`
    .chasing-dots-spinner {
      position: relative;
      width: 40px;
      height: 40px;
      margin: 25px auto;

      -webkit-animation: sk-rotate 2.0s infinite linear;
      animation: sk-rotate 2.0s infinite linear;
    }

    .dot1,
    .dot2 {
      width: 60%;
      height: 60%;
      display: inline-block;
      position: absolute;
      top: 0;
      border-radius: 100%;
      background-color: white;
      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }
    .blue {
      background-color: #1D6BB6;
    }

    .dot2 {
      top: auto;
      bottom: 0;
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-rotate {
      100% {
        -webkit-transform: rotate(360deg)
      }
    }

    @keyframes sk-rotate {
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg)
      }
    }

    @-webkit-keyframes sk-bounce {
      0%, 100% {
        -webkit-transform: scale(0.0)
      } 50% {
        -webkit-transform: scale(1.0)
      }
    }

    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }
  `],
  template:`<div [hidden]="!visible" class="chasing-dots-spinner">
    <div class="dot1" [ngClass]="{blue: !white}"></div>
    <div [ngClass]="{blue: !white}" class="dot2"></div>
  </div>`
})

export class LoaderComponent extends BaseSpinner {}
