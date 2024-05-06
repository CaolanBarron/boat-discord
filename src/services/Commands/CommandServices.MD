**Overview**
The services in this folder concern activities in game including starting, stopping and restarting them.

**Structure**

- start - starts the job and responds with the appropriate message
- job - Actually starts and schedules the job (seperate because we need to call this when restarting activities)
