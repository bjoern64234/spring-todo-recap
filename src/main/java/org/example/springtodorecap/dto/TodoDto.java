package org.example.springtodorecap.dto;

import lombok.Builder;
import lombok.With;
import org.example.springtodorecap.utils.Status;

@With
@Builder
public record TodoDto(String description, Status status) {
}
