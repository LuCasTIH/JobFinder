import { Component } from '@angular/core';
import { PostJobsPage } from '../post-jobs/post-jobs';
import { JobListPage } from '../job-list/job-list';
import { HistoryPage } from '../history/history';
// import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = JobListPage;
  tab2 = PostJobsPage;
  tab3 = HistoryPage;  
  constructor() {}

}
