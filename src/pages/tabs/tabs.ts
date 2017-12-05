import { Component } from '@angular/core';
import { PostJobsPage } from '../post-jobs/post-jobs';
import { JobListPage } from '../job-list/job-list';
// import { AuthProvider } from '../../providers/auth';
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = PostJobsPage;
  tab2 = JobListPage;
  tab3 = UserProfilePage;  
  constructor() {}

}
