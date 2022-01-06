aws ec2 authorize-security-group-ingress \
--group-id sg-0c2ac6f81fc7d3419 \
--protocol tcp \
--port 3306 \
--source-group sg-0660f7ed3df4cbfae


    "SecurityGroupRules": [
        {
            "SecurityGroupRuleId": "sgr-028b38045251ff497",
            "GroupId": "sg-0c2ac6f81fc7d3419",
            "GroupOwnerId": "320811592973",
            "IsEgress": false,
            "IpProtocol": "tcp",
            "FromPort": 3306,
            "ToPort": 3306,
            "ReferencedGroupInfo": {
                "GroupId": "sg-0660f7ed3df4cbfae"
            }
        }
    ]
}

aws ec2 authorize-security-group-ingress \
--group-id sg-0c2ac6f81fc7d3419 \
--protocol tcp \
--port 3306 \
--cidr 98.33.204.26/32

aws ec2 describe-security-groups \
    --group-ids sg-0c2ac6f81fc7d3419

    aws rds create-db-instance \
--engine mysql \
--db-instance-identifier just-tech-news-db \
--db-instance-class db.t2.micro \
--db-name newsfeed_db \
--vpc-security-group-ids sg-0c2ac6f81fc7d3419 \
--master-username root \
--master-user-password 123456789! \
--allocated-storage 20 \
--publicly-accessible \
--port 3306