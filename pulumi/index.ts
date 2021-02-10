import * as pulumi from "@pulumi/pulumi";
import * as azure_nextgen from "@pulumi/azure-nextgen";
//import * as compute from "@pulumi/azure-nextgen/compute/latest";


// Create an Azure Resource Group
const resourceGroup = new azure_nextgen.resources.latest.ResourceGroup("resourceGroup", {
    resourceGroupName: "my-rg-ccdc",
    location: "eastus",
});

//https://www.pulumi.com/docs/reference/pkg/azure-nextgen/compute/virtualmachine/
const virtualMachine = new azure_nextgen.compute.latest.VirtualMachine("Ubuntu Wkst", {
    hardwareProfile: {
        vmSize: "B1s",
    },
    location: "westus",
    networkProfile: {
        networkInterfaces: [{
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            primary: true,
        }],
    },
    osProfile: {
        adminPassword: "P@ssw0rdP@ssw0rd",
        adminUsername: "ccdc-admin",
        computerName: "Ubuntu_Wkst",
    },
    resourceGroupName: "my-rg-ccdc",
    storageProfile: {
        osDisk: {
            caching: "ReadWrite",
            createOption: "FromImage",
            image: {
                uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/UbuntuServer1804LTS.vhd",
            },
            name: "myVMosdisk",
            osType: "Linux",
            vhd: {
                uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk.vhd",
            },
        },
    },
    vmName: "{vm-name}",
});
