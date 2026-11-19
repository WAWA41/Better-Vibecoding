# Changing a shared contract

Before adding an interface or moving a business rule, look for a similar feature. Reuse its extension point if it supports the new behavior. If its assumptions differ, identify the difference before introducing another path.

Trace an affected caller to the code that owns the decision and identify other readers and writers of the same contract. If two paths enforce the same business rule, choose where it belongs. Introduce a shared abstraction when it removes concrete duplication or coupling.

Decide how affected callers and existing data will move to the new behavior. For example, if a saved setting changes shape, open a setting written by the previous version, change it through a current caller, then reopen it through another affected caller.

After the migration, check for callers still using the old path. Remove superseded implementations and workarounds once their consumers have moved. Keep a compatibility path while supported callers or stored data still depend on it.
