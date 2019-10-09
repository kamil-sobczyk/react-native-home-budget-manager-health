import { Store } from '../rootStore';
import { observable } from 'mobx';

export class VisibityClient {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }

  @observable showItems: boolean = true;
  @observable showMoreMenu: boolean = false;
  @observable showDrawer: boolean = false;
  @observable showFailSnackbar = false;
  @observable visibleDialog = 'LoginDialog';
  @observable prevVisibleDialog = '';

  setVisibleDialog = (dialog?: string): void => {
    this.prevVisibleDialog = this.visibleDialog;
    
    if (!dialog) {
      this.visibleDialog = '';
      
      return;
    }
    if (dialog === 'EditItemDialog') {
      this.store.itemManagerClient.setOldItem();
      this.visibleDialog = dialog;
    } else {
      this.visibleDialog = dialog;
    }
  };

  toggleShowFailSnackbar = (): boolean =>
    (this.showFailSnackbar = !this.showFailSnackbar);

  toggleShowDrawer = (): boolean => (this.showDrawer = !this.showDrawer);

  toggleShowItems = (): boolean => (this.showItems = !this.showItems);

  toggleShowMoreMenu = (): boolean => (this.showMoreMenu = !this.showMoreMenu);
}
