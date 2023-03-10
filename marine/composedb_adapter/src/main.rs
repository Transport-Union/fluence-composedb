/*
 * Copyright 2021 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 #![allow(improper_ctypes)]

 use marine_rs_sdk::marine;
 use marine_rs_sdk::module_manifest;
 use marine_rs_sdk::MountedBinaryResult;
 use marine_rs_sdk::WasmLoggerBuilder;
 
 module_manifest!();
 
 
 fn main() {
     WasmLoggerBuilder::new().build().unwrap();
 }


// //  'fetch records', 
//  fn query() -> MountedBinaryResult {
//     let cmd = vec!(
//         "query".to_owned()
//     );
//     tu_cdb(cmd)
//  }

// //  'add or update records',
// fn mutate() -> MountedBinaryResult {
//     let cmd = vec!(
//         "mutate".to_owned()
//     );
//     tu_cdb(cmd)
// }

// // creates a runtime defintion from a graphql schema'
// fn createFromSchema() -> {
//     let cmd = vec!(
//         "createFromSchema".to_owned()
//     );
//     tu_cdb(cmd)
// }

//  // 'tell node to index a composite',
//  fn index() -> MountedBinaryResult {
//     let cmd = vec!(
//         "index".to_owned()
//     );
//     tu_cdb(cmd)
//  }

// // fetch array of resources indexed by client',
// fn resources() -> MountedBinaryResult {
//     let cmd = vec!(
//         "resources".to_owned()
//     );
//     tu_cdb(cmd)
// }
 
 #[marine]
 pub fn tu_cdb_request(cmd: Vec<String>) -> MountedBinaryResult {
     let response = tu_cdb(cmd);
     response
 }
 
 // mounted_binaries are available to import like this:
 #[marine]
 #[link(wasm_import_module = "host")]
 extern "C" {
     pub fn tu_cdb(cmd: Vec<String>) -> MountedBinaryResult;
 }
 