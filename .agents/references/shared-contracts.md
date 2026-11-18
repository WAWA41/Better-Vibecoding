# Changing a shared contract

Trace one real caller from its entry point to the code that owns the value or decision. Identify the other readers and writers that depend on it. If two paths enforce the same business rule, choose where it belongs. Introduce a shared abstraction when it removes concrete duplication or coupling.

Decide how affected callers and existing data will move to the new behavior. For example, if a saved setting changes shape, open a setting written by the previous version, change it through a current caller, then reopen it through another affected caller.

After the migration, check for callers still using the old path. Remove superseded implementations and workarounds once their consumers have moved. Keep a compatibility path while supported callers or stored data still depend on it.
