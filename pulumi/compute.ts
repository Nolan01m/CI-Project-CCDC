import * as compute from "@pulumi/azure-native/compute";

// const virtualMachine = new compute.VirtualMachine("virtualMachine", {
//     hardwareProfile: {
//         vmSize: "Standard_D1_v2",
//     },
//     location: "eastus",
//     networkProfile: {
//         networkInterfaces: [{
//             id: nic1_id,
//             primary: true,
//         }],
//     },
//     osProfile: {
//         adminUsername: "{your-username}",
//         computerName: "myVM",
//         linuxConfiguration: {
//             disablePasswordAuthentication: true,
//             ssh: {
//                 publicKeys: [{
//                     keyData: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCeClRAk2ipUs/l5voIsDC5q9RI+YSRd1Bvd/O+axgY4WiBzG+4FwJWZm/mLLe5DoOdHQwmU2FrKXZSW4w2sYE70KeWnrFViCOX5MTVvJgPE8ClugNl8RWth/tU849DvM9sT7vFgfVSHcAS2yDRyDlueii+8nF2ym8XWAPltFVCyLHRsyBp5YPqK8JFYIa1eybKsY3hEAxRCA+/7bq8et+Gj3coOsuRmrehav7rE6N12Pb80I6ofa6SM5XNYq4Xk0iYNx7R3kdz0Jj9XgZYWjAHjJmT0gTRoOnt6upOuxK7xI/ykWrllgpXrCPu3Ymz+c+ujaqcxDopnAl2lmf69/J1",
//                     path: "/home/{your-username}/.ssh/authorized_keys",
//                 }],
//             },
//         },
//     },
//     resourceGroupName: "myResourceGroup",
//     storageProfile: {
//         imageReference: {
//             offer: "{image_offer}",
//             publisher: "{image_publisher}",
//             sku: "{image_sku}",
//             version: "latest",
//         },
//         osDisk: {
//             caching: "ReadWrite",
//             createOption: "FromImage",
//             managedDisk: {
//                 storageAccountType: "Standard_LRS",
//             },
//             name: "myVMosdisk",
//         },
//     },
//     vmName: "myVM",
// });