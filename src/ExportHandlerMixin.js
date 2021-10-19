/* eslint-disable class-methods-use-this */
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { html } from 'lit-html';
// import '@advanced-rest-client/arc-models/arc-data-export.js';
import '@anypoint-web-components/awc/bottom-sheet.js';
import { DataExportEventTypes, GoogleDriveEventTypes } from '@advanced-rest-client/events';
// eslint-disable-next-line no-unused-vars
import { DemoPage } from './DemoPage.js';

/** @typedef {import('@advanced-rest-client/events').ArcExportFilesystemEvent} ArcExportFilesystemEvent */
/** @typedef {import('@advanced-rest-client/events').GoogleDriveSaveEvent} GoogleDriveSaveEvent */

/**
 * @param {typeof DemoPage} base
 */
const mxFunction = base => {
  class ExportHandlerMixinImpl extends base {

    constructor() {
      super();
      this.initObservableProperties(['exportSheetOpened', 'exportFile', 'exportData']);
      /**
       * Whether the export bottom sheet is rendered
       * @type {boolean}
       */
      this.exportSheetOpened = false;
      /**
       * The export file name
       * @type {string}
       */
      this.exportFile = undefined;
      /**
       * The data exported by the export factory
       * @type {string}
       */
      this.exportData = undefined;
      /**
       * When true it actually downloads the file when the export provider is `file`
       * @type {boolean}
       */
      this.exportDownloadFile = false;

      window.addEventListener(DataExportEventTypes.fileSave, this._fileExportHandler.bind(this));
      window.addEventListener(GoogleDriveEventTypes.save, this._driveExportHandler.bind(this));

      this._exportOpenedChanged = this._exportOpenedChanged.bind(this);
    }

    /**
     * @param {ArcExportFilesystemEvent} e
     */
    _fileExportHandler(e) {
      const { providerOptions, data } = e;
      const { file, contentType } = providerOptions;
      e.preventDefault();
      e.detail.result = Promise.resolve({
        fileId: file,
        success: true,
        interrupted: false,
        parentId: '/home/user/Documents/export',
      });
      this._processExportData(data, file);
      if (this.exportDownloadFile) {
        this.downloadFile(data, contentType, file);
      }
    }

    /**
     * @param {GoogleDriveSaveEvent} e
     */
    _driveExportHandler(e) {
      const { providerOptions, data } = e;
      const { file } = providerOptions;
      e.preventDefault();
      e.detail.result = Promise.resolve({
        fileId: file,
        success: true,
        interrupted: false,
        parentId: 'random-drive-id',
      });
      this._processExportData(data, file);
    }

    /**
     * @param {string} data 
     * @param {string} file 
     */
    _processExportData(data, file) {
      setTimeout(() => {
        try {
          this.exportData = JSON.stringify(JSON.parse(data), null, 2);
        } catch (_) {
          this.exportData = data;
        }
        this.exportFile = file;
        this.exportSheetOpened = true;
      });
    }

    _exportOpenedChanged() {
      this.exportSheetOpened = false;
      this.exportFile = undefined;
      this.exportData = undefined;
    }

    /**
     * @param {string} data The exported data 
     * @param {string} mime The data content type
     * @param {string} file The export file name
     */
    downloadFile(data, mime, file) {
      const a = document.createElement('a');
      const blob = new Blob([data], { type: mime });
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = file;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
      }, 0); 
    }

    /**
     * A template to use when exporting the data.
     */
    exportTemplate() {
      const { exportSheetOpened, exportFile, exportData } = this;
      return html`
      <arc-data-export appVersion="demo-page"></arc-data-export>
      <bottom-sheet
        .opened="${exportSheetOpened}"
        @closed="${this._exportOpenedChanged}">
        <h3>Export demo</h3>
        <p>This is a preview of the file. Normally export module would save this data to file / Drive.</p>
        <p>File: ${exportFile}</p>
        <pre>${exportData}</pre>
      </bottom-sheet>
      `;
    }
  }
  return ExportHandlerMixinImpl;
}

/**
 * A mixin for the demo pages that handle export events.
 * This will render a dialog when the export is sent to any supported provides.
 * Instead of performing the data store (on Google Drive or user's filesystem)
 * it renders them in a dialog.
 * 
 * Use the `exportTemplate()` to generate the template related to the export preview UI.
 * 
 * This components does not install some dependencies. Your project has to install them on its own:
 * - @advanced-rest-client/arc-events
 * - @advanced-rest-client/arc-models
 * - @advanced-rest-client/bottom-sheet
 *
 * @mixin
 */
export const ExportHandlerMixin = dedupeMixin(mxFunction);
