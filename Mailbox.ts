import { CustomFolderList } from "./CustomFolder"
import Folder, { FolderList } from "./Folder"
import { SystemFolderList } from "./SystemFolder"
import { TagList } from "./Tag"

export default class Mailbox {
  private _id: string
  private _addr: string
  private _systemFolderList: SystemFolderList
  private _customFolderList: CustomFolderList
  private _tagList: TagList
  private _activedFolder: Folder
  constructor(id: string, systemFolderList: SystemFolderList, customFolderList: CustomFolderList, tagList: TagList) {
    this._id = id
    this._systemFolderList = systemFolderList
    this._customFolderList = customFolderList
    this._tagList = tagList
    this.setActivedFolder(this.systemFolderList, this._systemFolderList[0].id)
  }

  get id() {
    return this._id
  }

  get addr() {
    return this._addr
  }

  get systemFolderList() {
    return this._systemFolderList
  }

  get customFolderList() {
    return this._customFolderList
  }

  get tagList() {
    return this._tagList
  }

  get activedFolder() {
    return this._activedFolder
  }

  setActivedFolder<F extends Folder>(folderList: FolderList<F>, id: string) {
    const activedFolder = folderList.find(id)
    if (!activedFolder) return
    this._activedFolder = activedFolder
  }
}
