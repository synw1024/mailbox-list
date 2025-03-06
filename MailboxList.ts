import Folder, { EFolderListType, FolderList } from "./Folder";
import Mailbox from "./Mailbox";

export default class MailboxList {
  private _mailboxes: Mailbox[]
  private _activedMailbox: Mailbox
  constructor(mailboxes: Mailbox[]) {
    this.setMailboxes(mailboxes)
    this.setActivedMailbox(this.mailboxes[0].id, this.mailboxes[0].systemFolderList, 'inbox')
  }

  get mailboxes() {
    return this._mailboxes
  }

  setMailboxes(mailboxes: Mailbox[]) {
    this._mailboxes = mailboxes
  }

  get activedMailbox() {
    return this._activedMailbox
  }

  setActivedMailbox(mailboxId: string, folderList: EFolderListType, folderId: string): void
  setActivedMailbox<F extends Folder>(mailboxId: string, folderList: FolderList<F>, folderId: string): void
  setActivedMailbox<F extends Folder>(mailboxId: string, folderList: EFolderListType | FolderList<F>, folderId: string) {
    const activedMailbox = this.mailboxes.find(m => m.id === mailboxId)
    if (!activedMailbox) return
    this._activedMailbox = activedMailbox
    if (folderList instanceof FolderList) {
      this.activedMailbox.setActivedFolder(folderList, folderId)
    } else {
      if (folderList === EFolderListType.System) {
        this.activedMailbox.setActivedFolder(this.activedMailbox.systemFolderList, folderId)
      } else if (folderList === EFolderListType.Custom) {
        this.activedMailbox.setActivedFolder(this.activedMailbox.customFolderList, folderId)
      } else if (folderList === EFolderListType.Tag) {
        this.activedMailbox.setActivedFolder(this.activedMailbox.tagList, folderId)
      }
    }
  }
}
