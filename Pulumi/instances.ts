//This is where the instances are housed.
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { IP1D, IP2D, IP3D, IP6D, IP7D, IP8D, NR1, NR2, NR3 } from ".";

const computeInstance1 = new gcp.compute.Instance("Debian", {
    name: "debiansql",
    bootDisk: {
        initializeParams: {
            image: "debian-10",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: NR1,
        networkIp: IP1D,
        accessConfigs: [{}],
    }],

});

const computeInstance2 = new gcp.compute.Instance("Phantom", {
    name: "centosphantom",
    bootDisk: {
        initializeParams: {
            image: "centos-8",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: NR1,
        networkIp: IP2D,
        accessConfigs: [{}],
    }],
});

const computeInstance3 = new gcp.compute.Instance("Ubuntu", {
    name: "ubuntudns",
    bootDisk: {
        initializeParams: {
            image: "ubuntu-1604-lts",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: NR2,
        networkIp: IP3D,
        accessConfigs: [{}],
    }],
});
//windows-2012-r2 -- ComputeInstance4
//windows81 needs custom image -- ComputeInstance5
const computeInstance6 = new gcp.compute.Instance("Splunk", {
    name: "centsplunk",
    bootDisk: {
        initializeParams: {
            image: "centos-7",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: NR3,
        networkIp: IP6D,
        accessConfigs: [{}],
    }],
});
const computeInstance7 = new gcp.compute.Instance("Cent-E-Comm", {
    name: "ecomm",
    bootDisk: {
        initializeParams: {
            image: "centos-7",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: NR3,
        networkIp: IP7D,
        accessConfigs: [{}],
    }],
});
const computeInstance8 = new gcp.compute.Instance("Fedora", {
    name: "WebMail",
    bootDisk: {
        initializeParams: {
            image: "fedora-coreos-stable",
        },
    },
    machineType: "f1-micro",
    zone: "us-east1-b",
    networkInterfaces: [{
        subnetwork: NR3,
        networkIp: IP8D,
        accessConfigs: [{}],
    }],
});


