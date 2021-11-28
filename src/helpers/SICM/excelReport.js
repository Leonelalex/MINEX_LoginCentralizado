import { formDataFunctions } from "./";
const Excel = require("exceljs");

export async function createReport(params) {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Reporte");
  const INITROW = 2;
  const data = params.data;
  worksheet.columns = [
    { header: "No. Alerta", key: "numeroAlerta", width: 15 },
    { header: "Número de Caso", key: "numeroCaso", width: 15 },
    { header: "Acción", key: "accion", width: 25 },
    { header: "Estado", key: "estadoAlerta", width: 25 },
    { header: "Fecha", key: "fechaAccion", width: 18 },
    { header: "Observaciones", key: "observaciones", width: 40 },
  ];

  worksheet.duplicateRow(1, INITROW, true);

  worksheet.getRow(1).values = [];
  worksheet.getRow(2).values = [];

  data.forEach((log) => {
    const item = {
      numeroAlerta: log.numeroAlerta,
      numeroCaso: log.numeroCaso,
      accion: log.codigoAccionNotificacion
        ? formDataFunctions.getAccionesNotificacion(
            params.formData,
            log.codigoAccionNotificacion
          )
        : formDataFunctions.getAcciones(params.formData, log.codigoAccion),
      estadoAlerta: formDataFunctions.getEstado(
        params.formData,
        log.codigoEstado
      ),
      fechaAccion: formatDate(log.fechaAccion),
      observaciones: log.observaciones,
    };

    worksheet.addRow({
      ...item,
    });
  });

  worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
    worksheet.getCell(`A${rowNumber}`).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "none" },
    };

    const insideColumns = ["B", "C", "D", "E"];

    insideColumns.forEach((v) => {
      worksheet.getCell(`${v}${rowNumber}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "none" },
        right: { style: "none" },
      };
    });

    worksheet.getCell(`F${rowNumber}`).border = {
      top: { style: "thin" },
      left: { style: "none" },
      bottom: { style: "thin" },
      right: { style: "none" },
    };
  });

  worksheet.views = [{ activeCell: "A1" }];
  worksheet.getRow(1).values = [
    `Reporte del ${formatDateWithouHour(
      params.inicio
    )} al ${formatDateWithouHour(params.fin)}`,
  ];

  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(INITROW + 1).font = { bold: true };
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Reporte.xlsx";
  anchor.click();
  window.URL.revokeObjectURL(url);
}

export async function digracomReport(params) {
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Reporte");
  const data = params.data;
  const columns = ["Estado del Caso"];
  const sumRows = ["Total"];
  const columnsNames = ["A"];

  for (let i = 0; i < data[0].anios.length; i++) {
    const columName = getCellWithNumber(i + 1);
    columnsNames.push(columName);
    columns.push(params.data[0].anios[i]);
    sumRows.push({
      formula: `SUM(${columName}2:${columName}${data.length + 1})`,
      date1904: false,
    });
  }
  worksheet.addRow(columns);

  let maxWidth = 10;

  data.forEach((item) => {
    worksheet.addRow([item.estatus, ...item.cantidadPorAnio]);
    if (item.estatus.length > maxWidth) maxWidth = item.estatus.length;
  });

  worksheet.getColumn("A").width = maxWidth;

  worksheet.addRow(sumRows);

  let firstTime = true;
  worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
    columnsNames.forEach((v) => {
      worksheet.getCell(`${v}${rowNumber}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };

      if (firstTime && v !== "A") {
        worksheet.getColumn(v).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      }
    });
    firstTime = false;
  });

  worksheet.views = [{ activeCell: "A1" }];
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
  worksheet.getRow(data.length + 2).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Reporte.xlsx";
  anchor.click();
  window.URL.revokeObjectURL(url);
}

export async function estadoReport(params) {
  let workbook = new Excel.Workbook();
  let worksheetActivadas = workbook.addWorksheet("Activaciones");
  let worksheetDesact = workbook.addWorksheet("Desactivaciones");
  let month = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();

  const { activadas, desactivadas, year } = params;
  month = year === currentYear ? month : 12;

  worksheetActivadas.addRow(["ACTIVACIONES"]);
  worksheetActivadas.addRow(["MES", "HOMBRES", "MUJERES"]);

  worksheetDesact.addRow(["DESACTIVACIONES"]);
  worksheetDesact.addRow(["MES", "HOMBRES", "MUJERES"]);

  activadas.forEach((item, index) => {
    if (index >= month) return;

    worksheetActivadas.addRow([
      item.mes.toUpperCase(),
      item.hombres,
      item.mujeres,
      {
        formula: `SUM(B${index + 3}:C${index + 3})`,
        date1904: false,
      },
    ]);
  });

  desactivadas.forEach((item, index) => {
    if (index >= month) return;

    worksheetDesact.addRow([
      item.mes.toUpperCase(),
      item.hombres,
      item.mujeres,
      {
        formula: `SUM(B${index + 3}:C${index + 3})`,
        date1904: false,
      },
    ]);
  });

  worksheetActivadas.addRow([
    "TOTALES",
    {
      formula: `SUM(B3:B${month + 2})`,
      date1904: false,
    },
    {
      formula: `SUM(C3:C${month + 2})`,
      date1904: false,
    },
    {
      formula: `SUM(D3:D${month + 2})`,
      date1904: false,
    },
  ]);

  worksheetDesact.addRow([
    "TOTALES",
    {
      formula: `SUM(B3:B${month + 2})`,
      date1904: false,
    },
    {
      formula: `SUM(C3:C${month + 2})`,
      date1904: false,
    },
    {
      formula: `SUM(D3:D${month + 2})`,
      date1904: false,
    },
  ]);

  let firstTime = true;
  worksheetActivadas.eachRow({ includeEmpty: false }, function(row, rowNumber) {
    ["A", "B", "C", "D"].forEach((v) => {
      worksheetActivadas.getCell(`${v}${rowNumber}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      if (firstTime) {
        worksheetActivadas.getColumn(v).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      }
    });
    firstTime = false;
  });

  firstTime = true;
  worksheetDesact.eachRow({ includeEmpty: false }, function(row, rowNumber) {
    ["A", "B", "C", "D"].forEach((v) => {
      worksheetDesact.getCell(`${v}${rowNumber}`).border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      if (firstTime) {
        worksheetDesact.getColumn(v).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      }
    });
    firstTime = false;
  });

  worksheetActivadas.views = [{ activeCell: "A1" }];
  worksheetDesact.views = [{ activeCell: "A1" }];

  worksheetActivadas.getColumn("A").font = { bold: true };
  worksheetActivadas.getColumn("D").font = { bold: true };

  worksheetDesact.getColumn("A").font = { bold: true };
  worksheetDesact.getColumn("D").font = { bold: true };

  worksheetActivadas.getRow(1).font = { bold: true };
  worksheetDesact.getRow(1).font = { bold: true };
  worksheetActivadas.getRow(2).font = { bold: true };
  worksheetDesact.getRow(2).font = { bold: true };
  worksheetActivadas.getRow(month + 3).font = { bold: true };
  worksheetDesact.getRow(month + 3).font = { bold: true };

  worksheetActivadas.getColumn("A").width = 18;
  worksheetDesact.getColumn("A").width = 18;

  worksheetActivadas.getColumn("B").width = 13;
  worksheetDesact.getColumn("B").width = 13;

  worksheetActivadas.getColumn("C").width = 13;
  worksheetDesact.getColumn("C").width = 13;

  worksheetActivadas.getColumn("D").width = 10;
  worksheetDesact.getColumn("D").width = 10;

  worksheetActivadas.mergeCells("B1:C1");
  worksheetActivadas.getCell("B1").value = "GÉNERO";
  worksheetActivadas.mergeCells("D1:D2");
  worksheetActivadas.getCell("D1").value = "TOTAL";

  worksheetDesact.mergeCells("B1:C1");
  worksheetDesact.getCell("B1").value = "GÉNERO";
  worksheetDesact.mergeCells("D1:D2");
  worksheetDesact.getCell("D1").value = "TOTAL";

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `Activaciones y desactivaciones ${year}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}

export function readFile(file) {
  return new Promise((resolve) => {
    const wb = new Excel.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then((workbook) => {
        const data = [];
        workbook.eachSheet((sheet) => {
          sheet.eachRow((row) => {
            data.push(row.values);
          });
        });
        resolve(data);
      });
    };
  });
}

function formatDate(date) {
  if (!date) return "";
  let [days, hour] = date.split("T");
  const [year, month, day] = days.split("-");
  return `${day}-${month}-${year} ${hour.slice(0, 5)}`;
}

function formatDateWithouHour(date) {
  if (!date) return "";
  let [days] = date.split("T");
  const [year, month, day] = days.split("-");
  return `${day}-${month}-${year}`;
}

function getCellWithNumber(n) {
  const ordA = "a".charCodeAt(0);
  const ordZ = "z".charCodeAt(0);
  const len = ordZ - ordA + 1;

  let s = "";
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s;
    n = Math.floor(n / len) - 1;
  }
  return s.toUpperCase();
}
