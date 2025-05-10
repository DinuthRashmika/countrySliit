package com.nexests.nexests.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CusRegRequestDTO {
    private String fullName;
    private String username;
    private String email;
    private String password;
}
