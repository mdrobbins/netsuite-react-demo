/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope Public
 */
define([
  'N/error',
  'N/log',
  'N/runtime',
  './dt.tryCatch',
  './dt.timer',
], function (error, log, runtime, tryCatch, Timer) {
  function get(request) {
    const timer = new Timer();

    const { action } = request;

    const actionRouter = {
      searchCustomers,
    };

    const handler = actionRouter[action] || invalidAction;

    const response = tryCatch(handler, request);

    return {
      ...response,
      elapsedTime: timer.getElapsedSeconds(),
      governanceRemaining: runtime.getCurrentScript().getRemainingUsage(),
    };
  }

  //////////////////////////////////////////////

  function searchCustomers({ searchText }) {}

  function invalidAction({ action }) {
    log.error({
      title: 'INVALID_ACTION',
      details: `Invalid Action: ${action}`,
    });

    throw error.create({
      name: 'INVALID_ACTION',
      message: `Invalid Action: ${action}`,
      notifyOff: true,
    });
  }

  return {
    get,
  };
});
