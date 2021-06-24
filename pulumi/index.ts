import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
require('./network.ts')
// import * as compute from "@pulumi/azure-native/compute";
// import * as storage from "@pulumi/azure-native/storage";

// Azure Resource Group -- Similar to a VPC
export const ccdc = new resources.ResourceGroup("jc-ccdc", {
    location: "eastus",
    resourceGroupName: "ccdc",
});
