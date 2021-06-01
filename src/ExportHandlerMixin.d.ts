import { TemplateResult } from "lit-html";
import { ArcExportFilesystemEvent, GoogleDriveSaveEvent } from '@advanced-rest-client/arc-events';

declare function ExportHandlerMixin<T extends new (...args: any[]) => {}>(base: T): T & ExportHandlerMixinConstructor;
interface ExportHandlerMixinConstructor {
  new(...args: any[]): ExportHandlerMixin;
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
 */
interface ExportHandlerMixin {
  /**
   * Whether the export bottom sheet is rendered
   */
  exportSheetOpened: boolean;
  /**
   * The export file name
   */
  exportFile?: string;
  /**
   * The data exported by the export factory
   */
  exportData?: string;
  /**
   * When true it actually downloads the file when the export provider is `file`
   */
  exportDownloadFile: boolean;

  _fileExportHandler(e: ArcExportFilesystemEvent): void;

  _driveExportHandler(e: GoogleDriveSaveEvent): void;

  /**
   * @param data The exported data 
   * @param file The export file name
   */
  _processExportData(data: string, file: string): void;

  _exportOpenedChanged(): void;

  /**
   * @param data The exported data 
   * @param mime The data content type
   * @param file The export file name
   */
  downloadFile(data: string, mime: string, file: string): void;

  /**
   * A template to use when exporting the data.
   */
  exportTemplate(): TemplateResult;
}
