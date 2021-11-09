import { FloorPlanData } from "./models/floorPlanData";
import test_data from './testdata.json'


export class FloorplanService {

  /**
   * @brief This class is decoupled from the view model
   * Make a new function if we need dynamic data
   */
  static hardcodedData(): FloorPlanData {
    let hard_coded_data: FloorPlanData = {
      width: test_data.data.width,
      height: test_data.data.height,
      floorPlan: test_data.data.floorplan
    }
    return hard_coded_data;
  }

  static exportFloorPlan(data: FloorPlanData) {
    const exported_JSON = JSON.stringify(data); // this is ready to save
    console.log('exported');
    console.log(exported_JSON);
  }

  save(){
    console.log('saved');
  }
}