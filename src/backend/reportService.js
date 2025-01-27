import {appFetch, config} from './appFetch';

// Crear un nuevo reporte
export const createReport = (userId, reportData, onSuccess, onErrors) =>
    appFetch(
        '/reports',
        config('POST', {...reportData}),
        onSuccess,
        onErrors
    );

// Obtener reporte por ID
export const findReportById = (reportId, onSuccess, onErrors) =>
    appFetch(
        `/reports/${reportId}`,
        config('GET', null),
        onSuccess,
        onErrors
    );

// Obtener todos los reportes
export const findAllReports = (onSuccess, onErrors) =>
    appFetch(
        '/reports',
        config('GET', null),
        onSuccess,
        onErrors
    );

// Actualizar el estado de un reporte
export const updateReportStatus = (reportId, newStatus, onSuccess, onErrors) =>
    appFetch(
        `/reports/${reportId}/status?newStatus=${newStatus}`,
        config('PATCH', null),
        onSuccess,
        onErrors
    );

// Obtener reportes por estado
export const findReportsByStatus = (status, onSuccess, onErrors) =>
    appFetch(
        '/reports/status',
        config('GET', {status}),
        onSuccess,
        onErrors
    );
