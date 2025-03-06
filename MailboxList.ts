import CustomFolder from "./CustomFolder";
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
      } else {
        return
      }
    }
    this.activedMailbox.activedFolder.pullMails()
  }
}

const mailboxList = new MailboxList([])

function render() {
  return `<aside><menu>
    ${mailboxList.mailboxes.map(mailbox => `<li>
      <h6>${mailbox.addr}</h6>
      <menu>
        ${mailbox.systemFolderList.folders.map(folder => `<li>
          <h6>${folder.name}</h6>
        </li>`)}
      </menu>
      <menu>
        <li>
          <h6>我的文件夹</h6>
          ${renderCustomFolderDFS(mailbox.customFolderList.folders)}
        </li>
      </menu>
      <menu>
        ${mailbox.tagList.folders.map(folder => `<li>
          <h6>${folder.name}</h6>
        </li>`)}
      </menu>
    </li>`)}
  </menu></aside>`
}

/**
 * render custom folder list by DFS
 * @returns 
 */
function renderCustomFolderDFS(folders: CustomFolder[]) {
  return folders.length > 0 ? `<menu>
    ${folders.map(folder => `<li>
      <h6>${folder.name}</h6>
      ${renderCustomFolderDFS(folder.children)}
    </li>`)}
  </menu>` : ''
}
